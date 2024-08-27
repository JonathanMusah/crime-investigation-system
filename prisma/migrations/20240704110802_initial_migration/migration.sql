/*
  Warnings:

  - The primary key for the `case` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `message` on the `case` table. All the data in the column will be lost.
  - The primary key for the `officer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `officer` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `officer` table. All the data in the column will be lost.
  - You are about to drop the `addcaseofficer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[caseId]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officerId]` on the table `Officer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Officer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Description` to the `Case` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Case` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Officer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Officer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `addcaseofficer` DROP FOREIGN KEY `AddCaseOfficer_caseId_fkey`;

-- DropForeignKey
ALTER TABLE `addcaseofficer` DROP FOREIGN KEY `AddCaseOfficer_officerId_fkey`;

-- DropIndex
DROP INDEX `Officer_email_key` ON `officer`;

-- AlterTable
ALTER TABLE `case` DROP PRIMARY KEY,
    DROP COLUMN `message`,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `officer` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `status`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `addcaseofficer`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'OFFICER', 'NORMAL_USER') NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseOfficer` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `caseId` VARCHAR(191) NOT NULL,
    `officerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CaseOfficer_caseId_officerId_key`(`caseId`, `officerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Case_caseId_key` ON `Case`(`caseId`);

-- CreateIndex
CREATE UNIQUE INDEX `Officer_officerId_key` ON `Officer`(`officerId`);

-- CreateIndex
CREATE UNIQUE INDEX `Officer_userId_key` ON `Officer`(`userId`);

-- AddForeignKey
ALTER TABLE `Officer` ADD CONSTRAINT `Officer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaseOfficer` ADD CONSTRAINT `CaseOfficer_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `Case`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaseOfficer` ADD CONSTRAINT `CaseOfficer_officerId_fkey` FOREIGN KEY (`officerId`) REFERENCES `Officer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
