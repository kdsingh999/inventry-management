-- DropIndex
DROP INDEX `Shop_adminId_fkey` ON `shop`;

-- AlterTable
ALTER TABLE `customer` MODIFY `customerType` ENUM('RETAIL', 'WHOLESALE', 'DISTRIBUTOR', 'OTHER') NOT NULL DEFAULT 'RETAIL';

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplierType` ENUM('MANUFACTURER', 'DISTRIBUTOR', 'WHOLESALE', 'RETAILER', 'OTHER') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contactPerson` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `contry` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `taxPin` VARCHAR(191) NOT NULL,
    `registrationNumber` VARCHAR(191) NULL,
    `bankAccountNumber` VARCHAR(191) NULL,
    `bankName` VARCHAR(191) NULL,
    `ifscCode` VARCHAR(191) NULL,
    `paymentTerms` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL DEFAULT 'https://fastly.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ',
    `rating` DOUBLE NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Supplier_email_key`(`email`),
    UNIQUE INDEX `Supplier_phone_key`(`phone`),
    UNIQUE INDEX `Supplier_registrationNumber_key`(`registrationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
