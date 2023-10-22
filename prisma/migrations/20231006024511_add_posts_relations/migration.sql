-- AlterTable
ALTER TABLE `wp_posts` ADD COLUMN `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `wp_posts` ADD CONSTRAINT `wp_posts_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
