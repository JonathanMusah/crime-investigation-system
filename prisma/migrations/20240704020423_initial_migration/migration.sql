/*
  Warnings:

  - The primary key for the `case` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `case` table. All the data in the column will be lost.
  - You are about to drop the column `officerId` on the `case` table. All the data in the column will be lost.
  - The primary key for the `officer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `officer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `case` DROP FOREIGN KEY `Case_officerId_fkey`;

-- DropIndex
DROP INDEX `Case_caseId_key` ON `case`;

-- DropIndex
DROP INDEX `Officer_officerId_key` ON `officer`;

-- AlterTable
ALTER TABLE `case` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `officerId`,
    ADD COLUMN `status` ENUM('ACTIVE', 'CLOSED', 'IN_PROGRESS', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `message` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`caseId`);

-- AlterTable
ALTER TABLE `officer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    ADD PRIMARY KEY (`officerId`);

-- CreateTable
CREATE TABLE `AddCaseOfficer` (
    `caseId` VARCHAR(191) NOT NULL,
    `officerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`caseId`, `officerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AddCaseOfficer` ADD CONSTRAINT `AddCaseOfficer_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `Case`(`caseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AddCaseOfficer` ADD CONSTRAINT `AddCaseOfficer_officerId_fkey` FOREIGN KEY (`officerId`) REFERENCES `Officer`(`officerId`) ON DELETE RESTRICT ON UPDATE CASCADE;
