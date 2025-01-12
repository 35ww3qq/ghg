import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PackageTable from "./PackageTable";
import PackageForm from "./PackageForm";

interface Package {
  id: string;
  siteAddress: string;
  da: number;
  pa: number;
  credit: number;
  linkType: "PHP" | "JS";
  status: "Eklenmedi" | "Eklendi";
  date: string;
}

interface PackageManagementProps {
  packages?: Package[];
}

const defaultPackages: Package[] = [
  {
    id: "1",
    siteAddress: "example1.com",
    da: 1.0,
    pa: 8.0,
    credit: 1,
    linkType: "PHP",
    status: "Eklenmedi",
    date: "11.11.2024",
  },
  {
    id: "2",
    siteAddress: "example2.com",
    da: 3.0,
    pa: 10.0,
    credit: 1,
    linkType: "JS",
    status: "Eklenmedi",
    date: "11.11.2024",
  },
];

const PackageManagement = ({
  packages = defaultPackages,
}: PackageManagementProps) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleSelect = (id: string) => {
    const packageToEdit = packages.find((pkg) => pkg.id === id);
    if (packageToEdit) {
      setSelectedPackage(packageToEdit);
      setIsEditDialogOpen(true);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Package Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      <PackageTable packages={packages} onSelect={handleSelect} />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="p-0">
          <PackageForm
            onSubmit={(values) => {
              console.log("Create package:", values);
              setIsCreateDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="p-0">
          <PackageForm
            isEditing
            initialData={
              selectedPackage
                ? {
                    name: selectedPackage.siteAddress,
                    price: selectedPackage.credit.toString(),
                    features: "",
                    daThreshold: selectedPackage.da.toString(),
                    paThreshold: selectedPackage.pa.toString(),
                    spamScoreThreshold: "0",
                  }
                : undefined
            }
            onSubmit={(values) => {
              console.log("Update package:", values);
              setIsEditDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackageManagement;
