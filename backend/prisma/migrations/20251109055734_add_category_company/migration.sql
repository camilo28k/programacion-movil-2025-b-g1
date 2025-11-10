-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
