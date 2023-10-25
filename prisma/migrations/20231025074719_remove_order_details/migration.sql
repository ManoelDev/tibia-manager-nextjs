/*
  Warnings:

  - You are about to drop the `wp_orders_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wp_orders_details` DROP FOREIGN KEY `wp_orders_details_ordersId_fkey`;

-- DropTable
DROP TABLE `wp_orders_details`;
