-- DropForeignKey
ALTER TABLE `officer` DROP FOREIGN KEY `Officer_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Officer` ADD CONSTRAINT `Officer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
