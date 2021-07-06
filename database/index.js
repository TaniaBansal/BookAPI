let books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubdate: "2021-07-07",
      language: "en",
      numPage: 250,
      authors: [1, 2],
      publications : 1,
      category: ["tech", "programming", "education", "thriller"],
    },

    {
        ISBN: "12345Two",
        title: "Getting started with Python",
        pubdate: "2021-07-07",
        language: "en",
        numPage: 250,
        authors: [1],
        publications :1,
        category: ["tech", "programming", "education"],
      },
];

let authors = [
    {
        id: 1,
        name: "Tania",
        books: ["12345Book", "12345Two"],
    },
    {
        id:2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
];

let publications = [
    {
       id: 1,
       name: "writex",
       books:["12345Book" , "12345Two"],
    },

    {
        id : 2,
        name : "Vickie publications",
        books : [],
    },
];

module.exports = {books, authors, publications };