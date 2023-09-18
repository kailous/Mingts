// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

// 先定义好数据的类型结构
interface Entry {
    content: string;
    type: string;
    gifurl: string;
    pinyin: { pinyinText: string; pinyinLink: string }[];
    defn: string;
    gow: string[];
}

async function getHanzBishun(searchWords: string[]) {
    const results = {
        character: [] as Entry[], // 使用 Entry 类型
        word: [] as Entry[], // 使用 Entry 类型
    };

    for (const searchWord of searchWords) {
        const url = `https://hanyu.baidu.com/s?wd=${searchWord}&cf=rcmd&t=img&ptype=zici`;

        try {
            const response = await axios.get(url, { responseType: 'text' });
            const $ = cheerio.load(response.data);

            // 从HTML中提取数据的逻辑
            const gifUrl = $('#word_bishun').attr('data-gif');
            const pinyinDiv = $('#pinyin');
            const pinyinList = pinyinDiv.find('span').toArray().map((spanElement) => {
                const span = $(spanElement);
                const pinyin = span.text().trim().replace(/[\[\]]/g, ''); // 删除 '[' 和 ']'
                const pinyinLink = span.find('a').attr('url');
                return { pinyin, pinyinLink };
            });
            const baikeWrapperDiv = $('#baike-wrapper');
            const tabContentDiv = baikeWrapperDiv.find('.tab-content');
            const meanings = tabContentDiv.find('p').toArray().map((pElement) => {
                $(pElement).find('a').remove();
                return $(pElement).text().trim();
            }).join(' ');
            const zuciWrapperDiv = $('#zuci-wrapper');
            const zuciTabContentDiv = zuciWrapperDiv.find('.tab-content');
            const linkTerms = zuciTabContentDiv.find('a').toArray().map((aElement) => {
                return $(aElement).text().trim();
            });
            if (linkTerms.length > 0) {
                linkTerms.pop();
            }

            // 根据内容长度确定类型
            const type = searchWord.length === 1 ? 'character' : 'word';
            const entry: Entry = {
                content: searchWord || '没有收录',
                type: type,
                gifurl: gifUrl || './dictation_bihua.png',
                pinyin: (pinyinList && pinyinList.length > 0)
                    ? pinyinList.map(item => ({
                        pinyinText: (item && item.pinyin) ? item.pinyin.trim() : 'none',
                        pinyinLink: (item && item.pinyinLink) ? item.pinyinLink.trim() : 'none'
                    }))
                    : [{ pinyinText: 'none', pinyinLink: 'none' }],
                defn: meanings || '发现了未知事物，还没有被收录呢。', // Return empty string if meanings is empty
                gow: linkTerms || ['找不到合适的词组'] // Return an empty array if linkTerms is empty
            };

            results[type].push(entry);
        } catch (error) {
            console.error(`获取${searchWord}数据时出错: ${error}`);
        }
    }

    return results;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { zi } = req.query;
    const searchWords = (zi as string).split(' ');

    try {
        const result = await getHanzBishun(searchWords);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ 错误: `无法获取${zi}的数据` });
        }
    } catch (error) {
        console.error(`获取${zi}数据时出错: ${error}`);
        res.status(500).json({ 错误: '内部服务器错误' });
    }
};
