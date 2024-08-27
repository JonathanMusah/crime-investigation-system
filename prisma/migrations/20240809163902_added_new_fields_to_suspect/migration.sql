-- CreateTable
CREATE TABLE `Associate` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `relation` VARCHAR(191) NULL,
    `suspectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialMedia` (
    `id` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `suspectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alibi` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `suspectId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Alibi_suspectId_key`(`suspectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Associate` ADD CONSTRAINT `Associate_suspectId_fkey` FOREIGN KEY (`suspectId`) REFERENCES `Suspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialMedia` ADD CONSTRAINT `SocialMedia_suspectId_fkey` FOREIGN KEY (`suspectId`) REFERENCES `Suspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alibi` ADD CONSTRAINT `Alibi_suspectId_fkey` FOREIGN KEY (`suspectId`) REFERENCES `Suspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
