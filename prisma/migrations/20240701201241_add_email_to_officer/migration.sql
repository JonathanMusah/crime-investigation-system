-- prisma/migrations/[timestamp]_add_email_to_officer.sql

-- Step 1: Add the email column as nullable
ALTER TABLE `Officer` ADD COLUMN `email` VARCHAR(191);

-- Step 2: Update existing records with a placeholder email
-- You may want to customize this based on your needs
UPDATE `Officer` SET `email` = CONCAT(LOWER(REPLACE(`name`, ' ', '.')), '@example.com') WHERE `email` IS NULL;

-- Step 3: Make the email column required and unique
ALTER TABLE `Officer` MODIFY COLUMN `email` VARCHAR(191) NOT NULL;
ALTER TABLE `Officer` ADD UNIQUE INDEX `Officer_email_key`(`email`);
