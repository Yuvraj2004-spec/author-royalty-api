// data.js

const authors = [
  { id: 1, name: "Priya Sharma", email: "priya@email.com", bank: "1234567890", ifsc: "HDFC0001234" },
  { id: 2, name: "Rahul Verma", email: "rahul@email.com", bank: "0987654321", ifsc: "ICIC0005678" },
  { id: 3, name: "Anita Desai", email: "anita@email.com", bank: "5678901234", ifsc: "SBIN0009012" }
];

const books = [
  { id: 1, title: "The Silent River", author_id: 1, royalty: 45 },
  { id: 2, title: "Midnight in Mumbai", author_id: 1, royalty: 60 },
  { id: 3, title: "Code & Coffee", author_id: 2, royalty: 75 },
  { id: 4, title: "Startup Diaries", author_id: 2, royalty: 50 },
  { id: 5, title: "Poetry of Pain", author_id: 2, royalty: 30 },
  { id: 6, title: "Garden of Words", author_id: 3, royalty: 40 }
];

const sales = [
  { book_id: 1, quantity: 25, date: "2025-01-05" },
  { book_id: 1, quantity: 40, date: "2025-01-12" },
  { book_id: 2, quantity: 15, date: "2025-01-08" },
  { book_id: 3, quantity: 60, date: "2025-01-03" },
  { book_id: 3, quantity: 45, date: "2025-01-15" },
  { book_id: 4, quantity: 30, date: "2025-01-10" },
  { book_id: 5, quantity: 20, date: "2025-01-18" },
  { book_id: 6, quantity: 10, date: "2025-01-20" }
];

const withdrawals = [];

module.exports = { authors, books, sales, withdrawals };
