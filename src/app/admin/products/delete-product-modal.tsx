"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";

interface DeleteProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    productName: string;
    productImage?: string;
}

export function DeleteProductModal({
    open,
    onOpenChange,
    onConfirm,
    productName,
    productImage
}: DeleteProductModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
            onOpenChange(false);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <AlertDialogTitle className="text-lg">
                            Delete Product?
                        </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="text-sm">
                        <div className="flex items-start gap-3 mt-4">
                            {productImage && (
                                <div className="relative w-12 h-12 rounded overflow-hidden border border-gray-200">
                                    <img
                                        src={productImage}
                                        alt={productName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <p className="font-medium text-gray-900">{productName}</p>
                                <p className="text-red-600 text-sm mt-1">
                                    This action cannot be undone. The product will be permanently removed from your catalog.
                                </p>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel asChild>
                        <Button variant="outline" className="border-gray-300">
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={handleConfirm}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}