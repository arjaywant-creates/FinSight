-- Seed realistic demo transactions

DO $$
DECLARE
  uid uuid := 'YOUR_USER_ID_HERE';
BEGIN

INSERT INTO transactions (user_id, date, category, amount, description) VALUES

-- === INCOME (paychecks & side income) ===
(uid, '2025-12-15', 'Income', 3200.00, 'Bi-weekly paycheck'),
(uid, '2025-12-31', 'Income', 3200.00, 'Bi-weekly paycheck'),
(uid, '2026-01-15', 'Income', 3200.00, 'Bi-weekly paycheck'),
(uid, '2026-01-31', 'Income', 3200.00, 'Bi-weekly paycheck'),
(uid, '2026-01-20', 'Income', 450.00, 'Freelance design project'),
(uid, '2026-02-01', 'Income', 3200.00, 'Bi-weekly paycheck'),
(uid, '2026-02-05', 'Income', 125.00, 'Sold textbooks online'),

-- === RENT & HOUSING ===
(uid, '2025-12-01', 'Rent & Housing', 1250.00, 'December rent'),
(uid, '2026-01-01', 'Rent & Housing', 1250.00, 'January rent'),
(uid, '2026-02-01', 'Rent & Housing', 1250.00, 'February rent'),

-- === BILLS & UTILITIES ===
(uid, '2025-12-05', 'Bills & Utilities', 85.40, 'Electric bill'),
(uid, '2025-12-08', 'Bills & Utilities', 45.00, 'Internet - Xfinity'),
(uid, '2025-12-12', 'Bills & Utilities', 62.30, 'Phone bill - T-Mobile'),
(uid, '2026-01-05', 'Bills & Utilities', 92.15, 'Electric bill'),
(uid, '2026-01-08', 'Bills & Utilities', 45.00, 'Internet - Xfinity'),
(uid, '2026-01-11', 'Bills & Utilities', 62.30, 'Phone bill - T-Mobile'),
(uid, '2026-02-04', 'Bills & Utilities', 78.60, 'Electric bill'),
(uid, '2026-02-06', 'Bills & Utilities', 45.00, 'Internet - Xfinity'),

-- === GROCERIES ===
(uid, '2025-12-03', 'Groceries', 67.43, 'Publix weekly groceries'),
(uid, '2025-12-10', 'Groceries', 52.18, 'Trader Joes run'),
(uid, '2025-12-17', 'Groceries', 78.92, 'Publix weekly groceries'),
(uid, '2025-12-24', 'Groceries', 95.60, 'Holiday grocery haul'),
(uid, '2026-01-04', 'Groceries', 61.27, 'Publix weekly groceries'),
(uid, '2026-01-11', 'Groceries', 48.35, 'Aldi trip'),
(uid, '2026-01-18', 'Groceries', 72.80, 'Publix weekly groceries'),
(uid, '2026-01-25', 'Groceries', 55.44, 'Trader Joes run'),
(uid, '2026-02-01', 'Groceries', 63.90, 'Publix weekly groceries'),
(uid, '2026-02-06', 'Groceries', 41.25, 'Quick Aldi stop'),

-- === FOOD & DINING ===
(uid, '2025-12-06', 'Food & Dining', 32.50, 'Dinner at Chilis'),
(uid, '2025-12-14', 'Food & Dining', 14.75, 'Chick-fil-A lunch'),
(uid, '2025-12-20', 'Food & Dining', 48.90, 'Date night - Italian place'),
(uid, '2025-12-25', 'Food & Dining', 12.40, 'Starbucks coffee & pastry'),
(uid, '2025-12-29', 'Food & Dining', 22.15, 'Chipotle with friends'),
(uid, '2026-01-03', 'Food & Dining', 15.80, 'Zaxbys drive-thru'),
(uid, '2026-01-09', 'Food & Dining', 38.20, 'Sushi spot downtown'),
(uid, '2026-01-14', 'Food & Dining', 11.50, 'Dunkin morning run'),
(uid, '2026-01-22', 'Food & Dining', 27.65, 'Thai takeout'),
(uid, '2026-01-28', 'Food & Dining', 19.90, 'Wingstop order'),
(uid, '2026-02-02', 'Food & Dining', 42.30, 'Brunch with friends'),
(uid, '2026-02-05', 'Food & Dining', 8.75, 'Coffee at local cafe'),

-- === TRANSPORTATION ===
(uid, '2025-12-02', 'Transportation', 45.00, 'Gas - Shell station'),
(uid, '2025-12-16', 'Transportation', 42.80, 'Gas - QT'),
(uid, '2025-12-28', 'Transportation', 18.50, 'Uber to airport'),
(uid, '2026-01-06', 'Transportation', 47.25, 'Gas - Shell station'),
(uid, '2026-01-19', 'Transportation', 44.10, 'Gas - BP'),
(uid, '2026-02-03', 'Transportation', 46.50, 'Gas - Shell station'),

-- === SUBSCRIPTIONS ===
(uid, '2025-12-01', 'Subscriptions', 15.99, 'Netflix'),
(uid, '2025-12-01', 'Subscriptions', 11.99, 'Spotify Premium'),
(uid, '2025-12-01', 'Subscriptions', 7.99, 'iCloud+ storage'),
(uid, '2026-01-01', 'Subscriptions', 15.99, 'Netflix'),
(uid, '2026-01-01', 'Subscriptions', 11.99, 'Spotify Premium'),
(uid, '2026-01-01', 'Subscriptions', 7.99, 'iCloud+ storage'),
(uid, '2026-02-01', 'Subscriptions', 15.99, 'Netflix'),
(uid, '2026-02-01', 'Subscriptions', 11.99, 'Spotify Premium'),
(uid, '2026-02-01', 'Subscriptions', 7.99, 'iCloud+ storage'),

-- === SHOPPING ===
(uid, '2025-12-11', 'Shopping', 89.99, 'New running shoes - Nike'),
(uid, '2025-12-22', 'Shopping', 156.42, 'Christmas gifts - Amazon'),
(uid, '2025-12-23', 'Shopping', 45.00, 'Gift wrap & cards - Target'),
(uid, '2026-01-08', 'Shopping', 34.99, 'Hoodie from H&M'),
(uid, '2026-01-21', 'Shopping', 22.50, 'Book from Barnes & Noble'),
(uid, '2026-02-04', 'Shopping', 64.97, 'New backpack - Amazon'),

-- === ENTERTAINMENT ===
(uid, '2025-12-07', 'Entertainment', 24.00, 'Movie tickets x2'),
(uid, '2025-12-19', 'Entertainment', 15.00, 'Bowling night'),
(uid, '2025-12-31', 'Entertainment', 35.00, 'NYE party supplies'),
(uid, '2026-01-10', 'Entertainment', 18.50, 'Escape room groupon'),
(uid, '2026-01-26', 'Entertainment', 45.00, 'Concert tickets'),
(uid, '2026-02-07', 'Entertainment', 12.99, 'New game on Steam'),

-- === INSURANCE ===
(uid, '2025-12-15', 'Insurance', 145.00, 'Car insurance - State Farm'),
(uid, '2026-01-15', 'Insurance', 145.00, 'Car insurance - State Farm'),
(uid, '2026-02-05', 'Insurance', 145.00, 'Car insurance - State Farm'),

-- === HEALTHCARE ===
(uid, '2025-12-18', 'Healthcare', 25.00, 'Copay - annual checkup'),
(uid, '2026-01-07', 'Healthcare', 12.50, 'CVS prescription pickup'),
(uid, '2026-01-30', 'Healthcare', 35.00, 'Copay - dentist cleaning'),

-- === PERSONAL CARE ===
(uid, '2025-12-09', 'Personal Care', 28.00, 'Haircut'),
(uid, '2026-01-12', 'Personal Care', 28.00, 'Haircut'),
(uid, '2026-01-24', 'Personal Care', 18.50, 'Skincare products - Target'),

-- === EDUCATION ===
(uid, '2026-01-02', 'Education', 14.99, 'Udemy course - React'),
(uid, '2026-01-16', 'Education', 29.99, 'Textbook rental'),

-- === GIFTS & DONATIONS ===
(uid, '2025-12-20', 'Gifts & Donations', 50.00, 'Birthday gift for mom'),
(uid, '2025-12-25', 'Gifts & Donations', 25.00, 'Charity donation - Toys for Tots'),

-- === TRAVEL ===
(uid, '2025-12-27', 'Travel', 185.00, 'Round trip flight home'),
(uid, '2025-12-28', 'Travel', 42.00, 'Airport parking'),

-- === OTHER ===
(uid, '2026-01-13', 'Other', 15.00, 'Laundry quarters'),
(uid, '2026-02-02', 'Other', 8.50, 'Parking meter downtown');

END $$;
