const cors = require("cors");

const { authors, books, sales, withdrawals } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());
// ===== HELPER FUNCTIONS =====

function calculateAuthorEarnings(authorId) {
  const authorBooks = books.filter(b => b.author_id === authorId);

  let total = 0;

  authorBooks.forEach(book => {
    const bookSales = sales.filter(s => s.book_id === book.id);
    bookSales.forEach(sale => {
      total += sale.quantity * book.royalty;
    });
  });

  return total;
}

function calculateWithdrawnAmount(authorId) {
  return withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);
}

// ===== ROUTES =====

app.get("/authors", (req, res) => {
  const result = authors.map(author => {
    const total = calculateAuthorEarnings(author.id);
    const withdrawn = calculateWithdrawnAmount(author.id);

    return {
      id: author.id,
      name: author.name,
      total_earnings: total,
      current_balance: total - withdrawn
    };
  });

  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/authors/:id", (req, res) => {
  const authorId = parseInt(req.params.id);

  const author = authors.find(a => a.id === authorId);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const authorBooks = books
    .filter(b => b.author_id === authorId)
    .map(book => {
      const bookSales = sales.filter(s => s.book_id === book.id);
      const totalSold = bookSales.reduce((sum, s) => sum + s.quantity, 0);

      return {
        id: book.id,
        title: book.title,
        royalty_per_sale: book.royalty,
        total_sold: totalSold,
        total_royalty: totalSold * book.royalty
      };
    });

  const total = calculateAuthorEarnings(authorId);
  const withdrawn = calculateWithdrawnAmount(authorId);

  res.json({
    id: author.id,
    name: author.name,
    email: author.email,
    total_books: authorBooks.length,
    total_earnings: total,
    current_balance: total - withdrawn,
    books: authorBooks
  });
});

app.post("/withdrawals", (req, res) => {
  const { author_id, amount } = req.body;

  const author = authors.find(a => a.id === author_id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  if (amount < 500) {
    return res.status(400).json({ error: "Minimum withdrawal amount is ₹500" });
  }

  const total = calculateAuthorEarnings(author_id);
  const withdrawn = calculateWithdrawnAmount(author_id);
  const balance = total - withdrawn;

  if (amount > balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const withdrawal = {
    id: withdrawals.length + 1,
    author_id,
    amount,
    status: "pending",
    created_at: new Date().toISOString()
  };

  withdrawals.push(withdrawal);

  res.status(201).json({
    ...withdrawal,
    new_balance: balance - amount
  });
});
