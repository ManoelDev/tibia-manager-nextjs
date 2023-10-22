-- AlterTable
ALTER TABLE `wp_tokens` ADD COLUMN `accountsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `wp_tokens` ADD CONSTRAINT `wp_tokens_accountsId_fkey` FOREIGN KEY (`accountsId`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
