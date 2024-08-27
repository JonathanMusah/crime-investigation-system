-- CreateTable
CREATE TABLE `Suspect` (
    `id` VARCHAR(191) NOT NULL,
    `suspectId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dateOfBirth` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `hasDistinctiveFeatures` BOOLEAN NOT NULL,
    `distinctiveFeatures` VARCHAR(191) NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `dependents` VARCHAR(191) NULL,
    `hasCriminalHistory` BOOLEAN NOT NULL,
    `criminalHistory` VARCHAR(191) NULL,
    `socialMediaProfiles` VARCHAR(191) NULL,
    `idNumbers` VARCHAR(191) NULL,
    `relationshipToIncident` VARCHAR(191) NULL,
    `alibisAndWitnesses` VARCHAR(191) NULL,
    `comments` VARCHAR(191) NULL,
    `picture` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Suspect_suspectId_key`(`suspectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaseSuspect` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `caseId` VARCHAR(191) NOT NULL,
    `suspectId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CaseSuspect_caseId_suspectId_key`(`caseId`, `suspectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evidence` (
    `id` VARCHAR(191) NOT NULL,
    `evidenceId` VARCHAR(191) NOT NULL,
    `caseNumber` VARCHAR(191) NOT NULL,
    `evidenceType` ENUM('PHYSICAL', 'DIGITAL', 'DOCUMENTARY', 'TESTIMONIAL') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `collectionDate` DATETIME(3) NOT NULL,
    `collectionLocation` VARCHAR(191) NOT NULL,
    `collectedBy` VARCHAR(191) NOT NULL,
    `chainOfCustody` JSON NOT NULL,
    `storageLocation` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `caseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Evidence_evidenceId_key`(`evidenceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenceImage` (
    `id` VARCHAR(191) NOT NULL,
    `evidenceId` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EvidenceSuspect` (
    `id` VARCHAR(191) NOT NULL,
    `evidenceId` VARCHAR(191) NOT NULL,
    `suspectId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CaseSuspect` ADD CONSTRAINT `CaseSuspect_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `Case`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaseSuspect` ADD CONSTRAINT `CaseSuspect_suspectId_fkey` FOREIGN KEY (`suspectId`) REFERENCES `Suspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evidence` ADD CONSTRAINT `Evidence_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `Case`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenceImage` ADD CONSTRAINT `EvidenceImage_evidenceId_fkey` FOREIGN KEY (`evidenceId`) REFERENCES `Evidence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenceSuspect` ADD CONSTRAINT `EvidenceSuspect_evidenceId_fkey` FOREIGN KEY (`evidenceId`) REFERENCES `Evidence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvidenceSuspect` ADD CONSTRAINT `EvidenceSuspect_suspectId_fkey` FOREIGN KEY (`suspectId`) REFERENCES `Suspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
