/*
  Warnings:

  - You are about to alter the column `status` on the `wp_products_orders` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.
  - You are about to drop the column `accountsId` on the `wp_tokens` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `wp_tokens` DROP FOREIGN KEY `wp_tokens_accountsId_fkey`;

-- AlterTable
ALTER TABLE `wp_products_orders` MODIFY `status` ENUM('PROCESSING', 'PENDING', 'CANCELED', 'DELIVERED') NOT NULL DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE `wp_tokens` DROP COLUMN `accountsId`,
    ADD COLUMN `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `wp_tokens` ADD CONSTRAINT `wp_tokens_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
