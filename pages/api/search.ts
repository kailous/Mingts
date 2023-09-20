// pages/api/search.ts
// 鸣词后端主程序
// 获取生字的笔顺动画、拼音、释义、词组
// 用于处理 /api/search?zi=... 的请求

// 引入依赖
import {NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

// 先定义好数据的类型结构
interface Entry {
    content: string; // 汉字
    gifurl: string; // 笔顺动画
    pinyin: { pinyinText: string; pinyinLink: string }[]; // 拼音
    defn: string; // 释义
    gow: string[]; // 词组
}

// 用于获取数据
async function getHanzBishun(searchWords: string[]) {
    const results = {
        // 用于存放结果
        character: [] as Entry[], // 使用 Entry 类型
        word: [] as Entry[], // 使用 Entry 类型
    };

    for (const searchWord of searchWords) {
        const url = `https://hanyu.baidu.com/s?wd=${searchWord}&cf=rcmd&t=img&ptype=zici`;
        // 尝试获取数据
        try {
            // 获取 HTML 代码
            const response = await axios.get(url, {responseType: 'text'});
            const $ = cheerio.load(response.data);
            // 提取笔顺动画 & 拼音
            const gifUrl = $('#word_bishun').attr('data-gif');
            const pinyinDiv = $('#pinyin');
            const pinyinList = pinyinDiv
                .find('span')
                .toArray()
                .map((spanElement) => {
                    const span = $(spanElement);
                    const pinyin = span.text().trim().replace(/[\[\]]/g, ''); // 删除 '[' 和 ']'
                    const pinyinLink = span.find('a').attr('url');
                    return {pinyin, pinyinLink};
                });

            // ------------------------------------------------------------
            // [旧代码] // 提取释义
            // ------------------------------------------------------------
            // const baikeWrapperDiv = $('#baike-wrapper');
            // const tabContentDiv = baikeWrapperDiv.find('.tab-content');
            // const meanings = tabContentDiv
            //     .find('p')
            //     .toArray()
            //     .map((pElement) => {
            //         $(pElement).find('a').remove();
            //         return $(pElement).text().trim();
            //     })
            //     .join(' ');
            // ------------------------------------------------------------

            // 提取释义
            const baikeWrapperDiv = $('#basicmean-wrapper');
            const tabContentDiv = baikeWrapperDiv.find('.tab-content');
            const tabContentdl = tabContentDiv.find('dl');
            const tabContentdd = tabContentdl.find('dd');
            const meanings = tabContentdd
                .find('p')
                .toArray()
                .map((pElement) => $(pElement).text().trim())
                .join(' ');
            // 提取词组
            const zuciWrapperDiv = $('#zuci-wrapper');
            const zuciTabContentDiv = zuciWrapperDiv.find('.tab-content');
            const linkTerms = zuciTabContentDiv
                .find('a')
                .toArray()
                .map((aElement) => {
                    return $(aElement).text().trim();
                });
            if (linkTerms.length > 0) {
                linkTerms.pop();
            }
            // 根据内容长度确定类型
            const type = searchWord.length === 1 ? 'character' : 'word';
            // 将数据添加到 results 中
            const entry: Entry = { // 使用 Entry 类型
                content: searchWord || '没有收录',
                gifurl: gifUrl || './dictation_bihua.png',
                pinyin:
                    pinyinList && pinyinList.length > 0
                        ? pinyinList.map((item) => ({
                            pinyinText: item && item.pinyin ? item.pinyin.trim() : 'none',
                            pinyinLink: item && item.pinyinLink ? item.pinyinLink.trim() : 'none',
                        }))
                        : [{pinyinText: 'none', pinyinLink: 'none'}],
                defn: meanings || '发现了未知事物，还没有被收录呢。', // Return empty string if meanings is empty
                gow: linkTerms || ['找不到合适的词组'], // Return an empty array if linkTerms is empty
            };
            // 将 entry 添加到 results 中
            results[type].push(entry);
        } catch (error) {
            // 有可能是网络问题，或者是服务器问题...
            console.error(`获取${searchWord}数据时出错: ${error}`);
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
    const searchWords = (zi as string).split(' ');

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

