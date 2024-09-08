-- DropIndex
DROP INDEX `Shop_adminId_fkey` ON `shop`;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShopAttendants` ADD CONSTRAINT `_ShopAttendants_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
