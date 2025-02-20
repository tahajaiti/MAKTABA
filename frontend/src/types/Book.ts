interface Book {
    id: number,
    title: string,
    author: string,
    cover: string,
    quantity: number,
    created_at: Date,
    updated_at: Date
}

export interface BookAdd {
    title: string,
    author: string
    cover: File | null,
    quantity: number
}


export default Book;