export interface INews {
    source: ISource,
    title: string,
    author: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface ISource {
    id: any,
    name: string
}