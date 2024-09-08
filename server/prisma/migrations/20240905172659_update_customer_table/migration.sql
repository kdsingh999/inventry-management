/*
  Warnings:

  - You are about to drop the column `name` on the `customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nationalID]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerType` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCreditDays` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxCreditLimit` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationalID` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxPin` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Shop_adminId_fkey` ON `shop`;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `name`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerType` ENUM('RETAIL', 'WHOLESALE', 'DISTRIBUTOR', 'OTHER') NOT NULL,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxCreditDays` INTEGER NOT NULL,
    ADD COLUMN `maxCreditLimit` DOUBLE NOT NULL,
    ADD COLUMN `nationalID` VARCHAR(191) NOT NULL,
    ADD COLUMN `taxPin` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_phone_key` ON `Customer`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_nationalID_key` ON `Customer`(`nationalID`);

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
