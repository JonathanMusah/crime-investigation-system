/*
  Warnings:

  - The primary key for the `officer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `officer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `officer` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `officer` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `officer` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Officer_email_key` ON `officer`;

-- AlterTable
ALTER TABLE `officer` DROP PRIMARY KEY,
    DROP COLUMN `address`,
    DROP COLUMN `email`,
    DROP COLUMN `phone`,
    DROP COLUMN `picture`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Case` (
    `id` VARCHAR(191) NOT NULL,
    `caseId` VARCHAR(191) NOT NULL,
    `caseName` VARCHAR(191) NOT NULL,
    `officerId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Case_caseId_key`(`caseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Case` ADD CONSTRAINT `Case_officerId_fkey` FOREIGN KEY (`officerId`) REFERENCES `Officer`(`officerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
