-- CreateTable
CREATE TABLE `Prediction` (
    `id` VARCHAR(191) NOT NULL,
    `caseId` VARCHAR(191) NOT NULL,
    `suspectImage` VARCHAR(191) NOT NULL,
    `logicalScore` DOUBLE NOT NULL,
    `physicalScore` DOUBLE NOT NULL,
    `distanceFromCrime` DOUBLE NOT NULL,
    `facialExpression` VARCHAR(191) NOT NULL,
    `predictionScore` DOUBLE NOT NULL,
    `status` ENUM('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prediction` ADD CONSTRAINT `Prediction_caseId_fkey` FOREIGN KEY (`caseId`) REFERENCES `Case`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
