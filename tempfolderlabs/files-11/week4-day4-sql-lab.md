# Week 4 · Day 4 — SQL: Talking to Databases (Lab Work)

Completed through Exercise 4. Exercises 5 and 6 in progress.

Playground: W3Schools TrySQL (Customers, Orders, Products, OrderDetails, Employees, Categories, Shippers, Suppliers).

---

## Exercise 1 — Basic SELECT

```sql
-- 1. All customers (91 rows)
SELECT * FROM Customers;

-- 2. Customer names and cities
SELECT CustomerName, City FROM Customers;

-- 3. All products
SELECT * FROM Products;

-- 4. Product name and price
SELECT ProductName, Price FROM Products;

-- 5. All employees
SELECT * FROM Employees;
```

---

## Exercise 2 — Filtering with WHERE

```sql
-- 1. Customers from Germany (11 customers)
SELECT * FROM Customers WHERE Country = 'Germany';

-- 2. Products over $40
SELECT * FROM Products WHERE Price > 40;

-- 3. Customers from London  (London is a CITY, not a country)
SELECT * FROM Customers WHERE City = 'London';

-- 4. Category 1 products under $20
SELECT * FROM Products WHERE CategoryID = 1 AND Price < 20;

-- 5. Customers from Germany OR France
SELECT * FROM Customers WHERE Country = 'Germany' OR Country = 'France';

-- 6. Products cheapest first
SELECT * FROM Products ORDER BY Price ASC;

-- 7. 5 most expensive products
SELECT TOP 5 * FROM Products ORDER BY Price DESC;
```

**Dialect note on #7:** The W3Schools playground is a custom in-browser engine that accepts `TOP` and errors on `LIMIT` (backwards from most engines). So `TOP 5` is correct *there*. In Postgres (your Phase 2 app's database) `TOP` is not supported, so you write `... ORDER BY Price DESC LIMIT 5;`. Rule of thumb: `TOP` for SQL Server and the W3Schools toy, `LIMIT` for Postgres / MySQL / SQLite.

---

## Exercise 3 — JOIN

```sql
-- 1. Each order with the customer's name
SELECT Customers.CustomerName, Orders.OrderID, Orders.OrderDate
FROM Orders
JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- 2. Each product with its category name
SELECT Products.ProductName, Categories.CategoryName
FROM Products
JOIN Categories ON Products.CategoryID = Categories.CategoryID;

-- 3. Orders with customer name, newest first
SELECT Customers.CustomerName, Orders.OrderID, Orders.OrderDate
FROM Orders
JOIN Customers ON Orders.CustomerID = Customers.CustomerID
ORDER BY Orders.OrderDate DESC;

-- 4. Challenge: product with category name AND supplier name (two JOINs)
SELECT Products.ProductName, Categories.CategoryName, Suppliers.SupplierName
FROM Products
JOIN Categories ON Products.CategoryID = Categories.CategoryID
JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;
```

**Explaining the two-JOIN query, line by line:**
- `SELECT ...` picks three columns, each qualified by its table: `ProductName` from Products, `CategoryName` from Categories, `SupplierName` from Suppliers.
- `FROM Products` is the base table, one row per product to start.
- `JOIN Categories ON Products.CategoryID = Categories.CategoryID` matches each product's `CategoryID` to the Categories row with the same `CategoryID`, attaching the right category.
- `JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID` matches each product's `SupplierID` to the Suppliers row, attaching the right supplier.

**Key idea:** a JOIN matches rows between tables on a key. `Products.CategoryID = Categories.CategoryID` is a foreign key matching a primary key. JOINs are foreign keys in action.

---

## Exercise 4 — Five Queries for the Workflow App

Against the locked schema (`users`, `workflows`, `steps`, `tasks`). `?` is a parameterized placeholder (also the SQL-injection defense, never interpolate user input into the string).

```sql
-- 1. All workflows for the logged-in user (scoped SELECT = the auth rule)
SELECT * FROM workflows
WHERE user_id = ?;

-- 2. That user's pinned workflows, most recently worked on first
SELECT * FROM workflows
WHERE user_id = ? AND pinned = true
ORDER BY updated_at DESC;

-- 3. All steps in a workflow, in display order
SELECT * FROM steps
WHERE workflow_id = ?
ORDER BY position ASC;

-- 4. Every task in a workflow, with its parent step's name (single JOIN)
SELECT steps.name AS step_name, tasks.text, tasks.complete
FROM tasks
JOIN steps ON tasks.step_id = steps.id
WHERE steps.workflow_id = ?
ORDER BY steps.position;

-- 5. Every task for the logged-in user, with workflow + step name (double JOIN, scoped)
SELECT workflows.name AS workflow, steps.name AS step, tasks.text, tasks.complete
FROM tasks
JOIN steps ON tasks.step_id = steps.id
JOIN workflows ON steps.workflow_id = workflows.id
WHERE workflows.user_id = ?;
```

Coverage: scoping, filtering, sorting, single JOIN, double-JOIN hierarchy walk.

**Next step (when progress bars are wanted):** a `COUNT()` aggregate, e.g. how many tasks in a step are complete. Not yet covered in the lab.

---

## Exercise 5 — INSERT, UPDATE, DELETE (playground)

```sql
-- INSERT a new customer
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('New Student Books', 'Sample Contact', '123 Main St', 'Chicago', '60601', 'USA');

-- UPDATE a product's price
UPDATE Products SET Price = 25.00 WHERE ProductID = 1;

-- DELETE a customer
DELETE FROM Customers WHERE CustomerName = 'New Student Books';
```

**Key habit:** always put a `WHERE` on UPDATE and DELETE. Without one, the statement hits every row in the table.

---

## Exercise 6 — INSERT / UPDATE / DELETE for the Workflow App

**Create a new user.** Omit columns that have defaults (`id` auto-generates, `is_deleted` defaults to false, `created_at` defaults to now). Only list the columns you supply. Quote all string values.

```sql
INSERT INTO users (email, password_hash, name)
VALUES ('123@email.com', '$2b$10$Xq9...hashedvalue', 'bob');
```

**Rename a workflow.** The workflows PK is `id` (not `workflow_id`, which is the FK over in `steps`).

```sql
-- Basic
UPDATE workflows SET name = 'BugBounty Workflow' WHERE id = 1;

-- Real multi-user version: scope to the owner, bump the timestamp
UPDATE workflows
SET name = 'BugBounty Workflow', updated_at = now()
WHERE id = 1 AND user_id = ?;
```

**"Delete" a user = soft delete.** Per the Day 3 decision, there is no DELETE statement for users. Flip the flag with an UPDATE so the row and all their workflows/steps/tasks survive.

```sql
UPDATE users SET is_deleted = true WHERE id = ?;
```

**Lessons locked in:**
- Defaults mean you omit those columns on INSERT; the database fills them.
- A table refers to its own primary key as `id`; a child table references it via a `*_id` foreign key.
- Auth scoping (`AND user_id = ?`) applies to writes too, not just reads.
- A design decision (soft delete) changes which statement you reach for (UPDATE, not DELETE).
