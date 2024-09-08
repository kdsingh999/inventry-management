/*
  Warnings:

  - You are about to drop the column `contry` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the column `ifscCode` on the `supplier` table. All the data in the column will be lost.
  - Added the required column `country` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Shop_adminId_fkey` ON `shop`;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `contry`,
    DROP COLUMN `ifscCode`,
    ADD COLUMN `IFCCode` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
