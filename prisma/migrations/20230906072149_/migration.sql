/*
  Warnings:

  - You are about to drop the column `description` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the column `village` on the `Banner` table. All the data in the column will be lost.
  - Added the required column `description` to the `Adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `Adress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adress" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "village" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "description",
DROP COLUMN "village",
ADD COLUMN     "link" TEXT NOT NULL;
