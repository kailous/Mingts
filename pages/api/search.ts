// pages/api/search.ts
// 鸣词后端主程序
// 获取生字的笔顺动画、拼音、释义、词组
// 用于处理 /api/search?zi=... 的请求

// 引入依赖
import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';

// 先定义好数据的类型结构
interface Entry {
    content: string; // 汉字
    gifurl: string; // 笔顺动画
    pinyin: { pinyinText: string; pinyinLink: string }[]; // 拼音
    defn: string; // 释义
    gow: string[]; // 词组
}

type BaiduArrayValue = string[] | string | null | undefined;

interface BaiduWordDetail {
    stroke_order_gif?: string | null;
    comprehensive_definition?: {
        pinyin?: BaiduArrayValue;
        voice?: BaiduArrayValue;
        definition?: BaiduArrayValue;
        new_definition?: BaiduArrayValue;
        related_term?: BaiduArrayValue;
    }[] | null;
    zuci_list?: { name?: BaiduArrayValue }[] | null;
}

const DEFAULT_GIF = './dictation_bihua.png';

const firstText = (value: BaiduArrayValue): string => {
    if (Array.isArray(value)) {
        return value.find(Boolean)?.trim() || '';
    }

    return value?.trim() || '';
};

const toTextList = (value: BaiduArrayValue): string[] => {
    if (Array.isArray(value)) {
        return value.map((item) => item.trim()).filter(Boolean);
    }

    return value ? [value.trim()] : [];
};

async function getBaiduWordDetail(searchWord: string): Promise<BaiduWordDetail | null> {
    const response = await axios.get('https://hanyuapp.baidu.com/dictapp/word/detail_getzuci', {
        params: {
            wd: searchWord,
            client: 'pc',
        },
        timeout: 15000,
        responseType: 'json',
    });

    if (response.data?.errno !== 0) {
        throw new Error(response.data?.errmsg || '百度汉语接口返回异常');
    }

    return response.data?.data?.detail || null;
}

function buildCharacterEntry(searchWord: string, detail: BaiduWordDetail | null): Entry {
    const definitions =
        detail?.comprehensive_definition
            ?.flatMap((item) => toTextList(item.definition).length > 0 ? toTextList(item.definition) : toTextList(item.new_definition))
            .filter(Boolean) || [];

    const pinyinList =
        detail?.comprehensive_definition
            ?.map((item) => ({
                pinyinText: firstText(item.pinyin) || 'none',
                pinyinLink: firstText(item.voice) || 'none',
            }))
            .filter((item) => item.pinyinText !== 'none') || [];

    const zuciList =
        detail?.zuci_list
            ?.map((item) => firstText(item.name))
            .filter((term) => term.length === 2)
            .slice(0, 10) || [];

    return {
        content: searchWord || '没有收录',
        gifurl: detail?.stroke_order_gif || DEFAULT_GIF,
        pinyin: pinyinList.length > 0 ? pinyinList : [{pinyinText: 'none', pinyinLink: 'none'}],
        defn: definitions.join(' ') || '发现了未知事物，还没有被收录呢。',
        gow: zuciList.length > 0 ? zuciList : ['找不到合适的词组'],
    };
}

async function buildTermEntry(searchWord: string): Promise<Entry> {
    const pinyinItems = await Promise.all(
        Array.from(searchWord).map(async (character) => {
            try {
                const detail = await getBaiduWordDetail(character);
                const definition = detail?.comprehensive_definition?.[0];

                return {
                    pinyinText: firstText(definition?.pinyin) || character,
                    pinyinLink: firstText(definition?.voice) || 'none',
                };
            } catch (error) {
                console.error(`获取${character}拼音时出错: ${error}`);

                return {
                    pinyinText: character,
                    pinyinLink: 'none',
                };
            }
        })
    );
    const pinyinText = pinyinItems.map((item) => item.pinyinText).join(' ');
    const pinyinList = pinyinItems.map((item, index) => ({
        pinyinText: index === 0 ? pinyinText : item.pinyinText,
        pinyinLink: item.pinyinLink,
    }));

    return {
        content: searchWord || '没有收录',
        gifurl: DEFAULT_GIF,
        pinyin: pinyinList.length > 0 ? pinyinList : [{pinyinText: 'none', pinyinLink: 'none'}],
        defn: '这个词暂时没有拿到释义，可以先作为听写词练习。',
        gow: [],
    };
}

async function getHanzBishun(searchWords: string[]) {
    const results = {
        // 用于存放结果
        character: [] as Entry[], // 使用 Entry 类型
        word: [] as Entry[], // 使用 Entry 类型
    };

    for (const searchWord of searchWords) {
        if (!searchWord) {
            continue;
        }

        try {
            if (searchWord.length === 1) {
                const detail = await getBaiduWordDetail(searchWord);
                results.character.push(buildCharacterEntry(searchWord, detail));
            } else {
                results.word.push(await buildTermEntry(searchWord));
            }
        } catch (error) {
            console.error(`获取${searchWord}数据时出错: ${error}`);
            const fallback = searchWord.length === 1 ? buildCharacterEntry(searchWord, null) : await buildTermEntry(searchWord);
            results[searchWord.length === 1 ? 'character' : 'word'].push(fallback);
        }
    }
    // 返回结果
    return results;
}

// 用于处理 /api/search?zi=... 的请求
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).json({ error: 'Only POST requests are allowed' });
        return;
    }

    const { zi } = req.body;
    const searchWords = String(zi || '').split(/\s+/).filter(Boolean);

    // 尝试获取数据
    try {
        // 获取数据
        const result = await getHanzBishun(searchWords);
        // 返回数据
        if (result) { // 如果 result 不是 undefined
            res.json(result); // 返回 result
        } else { // 如果 result 是 undefined
            res.status(404).json({ Error: `无法获取${zi}的数据` }); // 返回 404
        }
    } catch (error) { // 如果出错
        console.error(`获取${zi}数据时出错: ${error}`); // 打印错误信息
        res.status(500).json({ Error: '内部服务器错误' }); // 返回 500
    }
};

export default handler;
