import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Documentation ({show, onClose }) {                                      // Props liés à la modal de Flowbite - initiés dans PageProgilUser

    const navigate = useNavigate();


  return (
    <>
      <Modal show={show} onClose={onClose} size="md">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
          <ModalHeader className="bg-slate-500 dark:bg-gray-900 text-gray-900 dark:text-white">
            Documentation
          </ModalHeader>
          <ModalBody className="flex-col bg-slate-500 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
            <div className="flex flex-col gap-4">
            <div className="bg-slate-500 text-center border rounded-lg dark:text-white" onClick={() => navigate("/cgu")}>Conditions d'utilisation</div> {/* utilisation d'un hooks pour naviguer vers la page souhaité */}

            <div className="bg-slate-500 text-center border rounded-lg dark:text-white" onClick={() => navigate("/rgpd")}>Politique de confidentialité</div>
            </div>
            <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                color="gray"
                onClick={onClose}
                className="flex-1"
              >
                Fermer
              </Button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
}