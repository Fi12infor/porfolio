/*
  Warnings:

  - You are about to drop the column `color` on the `technologies` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `technologies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "technologies" DROP COLUMN "color",
DROP COLUMN "iconUrl";
