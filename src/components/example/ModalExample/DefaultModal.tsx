"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";

import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";

export default function DefaultModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const { t } = useTranslation();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div>
      <ComponentCard title="Default Modal">
        <Button size="sm" onClick={openModal}>
          {t('common.open_modal')}
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[600px] p-5 lg:p-10"
        >
          <h4 className="font-semibold text-gray-800 mb-7 text-title-sm dark:text-white/90">
            {t('modal.heading')}
          </h4>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio condimentum aliquet a nec nulla. Aliquam bibendum ex sit
            amet ipsum rutrum feugiat ultrices enim quam.
          </p>
          <p className="mt-5 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod est quis mauris lacinia pharetra. Sed a ligula
            ac odio.
          </p>
          <div className="flex items-center justify-end w-full gap-3 mt-8">
            <Button size="sm" variant="outline" onClick={closeModal}>
              {t('common.close')}
            </Button>
            <Button size="sm" onClick={handleSave}>
              {t('common.save_changes')}
            </Button>
          </div>
        </Modal>
      </ComponentCard>
    </div>
  );
}
