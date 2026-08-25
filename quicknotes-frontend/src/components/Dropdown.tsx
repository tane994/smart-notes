// Dropdown.tsx
import { useState, useEffect } from "react";
import SDK, { type Collection } from "../sdk/api";
import CreatableSelect from "react-select/creatable";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FolderIcon } from "@heroicons/react/24/outline";

type Props = {
  value: number | null;
  onChange: (id: number | null) => void;
};

const Dropdown = ({ value, onChange }: Props) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string | null>("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const collectionsData: Collection[] = await SDK.getCollections();
        setCollections(collectionsData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error fetching collections",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  const handleCreateOption = async (inputValue: string) => {
    try {
      setLoading(true);
      const newlyCreatedCollection = await SDK.createCollection({
        name: inputValue,
      });

      // Aggiorna la lista locale delle opzioni
      setCollections((prev) => [...prev, newlyCreatedCollection]);

      // Seleziona la nuova collezione creata
      if (newlyCreatedCollection.id !== undefined) {
        onChange(newlyCreatedCollection.id);
      }
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error creating collection",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && collections.length === 0)
    return <div className="status-message">Loading collections...</div>;

  const handleCollectionUpdate = async () => {
    try {
      await SDK.updateCollection(value!, {
        ...collections.find((collection) => collection.id === value),
        name: editValue!,
      });
      const data = await SDK.getCollections();
      setCollections(data);
      setEditValue("");
      setShowModal(false);
    } catch (err) {
      console.log("Something went wrong. The collection was not updated!", err);
    }
  };

  const handleDeleteCollection = async () => {
    try {
      await SDK.deleteCollection(value!);
      const data = await SDK.getCollections();
      setCollections(data);
      setShowModal(false);
      onChange(null);
    } catch (err) {
      console.log("something went wrong", err);
    }
  };

  return (
    <div>
      {error && <div className="status-message error">Error: {error}</div>}
      <div className="flex justify-left">
        <CreatableSelect
          className="min-w-120 mr-1"
          styles={{
            control: (base) => ({
              ...base,
              height: "100%",
              minHeight: "100%",
            }),
          }}
          isClearable
          isDisabled={loading}
          placeholder="Filter by Collection"
          options={collections.map((collection) => ({
            value: collection.id,
            label: collection.name,
          }))}
          value={
            value
              ? {
                  value,
                  label: collections.find(
                    (collection) => collection.id === value,
                  )?.name,
                }
              : null
          }
          onChange={(data) => {
            setEditValue("");
            setShowModal(false);
            onChange(data?.value ?? null);
          }}
          onCreateOption={handleCreateOption}
        />
        {value ? (
          <button
            className="btn min-h-48"
            onClick={() => {
              setShowModal(true);
              const currentCollectionName = collections.find(
                (collection) => collection.id === value,
              )?.name;
              setEditValue(currentCollectionName ?? "");
            }}
          >
            Edit Collection
          </button>
        ) : (
          <></>
        )}
      </div>
      <Dialog
        open={showModal}
        onClose={setShowModal}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10">
                    <FolderIcon
                      aria-hidden="true"
                      className="size-6 text-indigo-600"
                    />
                  </div>
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Edit collection
                    </DialogTitle>
                    <div className="mt-4">
                      <label
                        htmlFor="collection-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Collection name
                      </label>
                      <input
                        id="collection-name"
                        data-autofocus
                        value={editValue!}
                        onChange={(e) => {
                          setEditValue(e.target.value);
                        }}
                        className="mt-2 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="gap-2 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleCollectionUpdate}
                  className="btn"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteCollection}
                  className="btn-delete sm:mr-auto"
                >
                  Delete collection
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Dropdown;
