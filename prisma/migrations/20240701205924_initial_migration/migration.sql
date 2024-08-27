/*
  Warnings:

  - Added the required column `address` to the `Officer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Officer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `case` MODIFY `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `officer` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `picture` VARCHAR(191) NULL;
