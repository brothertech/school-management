"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { useModal } from "@/hooks/useModal";
import { useTranslation } from "@/hooks/useTranslation";

export default function FormInModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const { t } = useTranslation();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <ComponentCard title="Form In Modal">
      <Button size="sm" onClick={openModal}>
        {t('common.open_modal')}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <form className="">
          <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
            {t('form.personal_information')}
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>{t('form.first_name')}</Label>
              <Input type="text" placeholder={t('form.first_name_placeholder')} />
            </div>

            <div className="col-span-1">
              <Label>{t('form.last_name')}</Label>
              <Input type="text" placeholder={t('form.last_name_placeholder')} />
            </div>

            <div className="col-span-1">
              <Label>{t('form.email')}</Label>
              <Input type="email" placeholder={t('form.email_placeholder')} />
            </div>

            <div className="col-span-1">
              <Label>{t('form.phone')}</Label>
              <Input type="text" placeholder={t('form.phone_placeholder')} />
            </div>

            <div className="col-span-1 sm:col-span-2">
              <Label>{t('form.bio')}</Label>
              <Input type="text" placeholder={t('form.bio_placeholder')} />
            </div>
          </div>

          <div className="flex items-center justify-end w-full gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              {t('common.close')}
            </Button>
            <Button size="sm" onClick={handleSave}>
              {t('common.save_changes')}
            </Button>
          </div>
        </form>
      </Modal>
    </ComponentCard>
  );
}
