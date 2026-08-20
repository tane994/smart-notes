// Dropdown.tsx
import { useState, useEffect } from "react";
import SDK, { type Collection } from "../sdk/api";
import CreatableSelect from "react-select/creatable";

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

  const handleDeleteCollection = async() => {
    try {
      await SDK.deleteCollection(value!)
      const data = await SDK.getCollections();
      setCollections(data);
      setShowModal(false);
      onChange(null)
    } catch (err) {
      console.log("something went wrong", err)
    }
  }

  return (
    <div>
      {error && <div className="status-message error">Error: {error}</div>}
      <CreatableSelect
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
                label: collections.find((collection) => collection.id === value)
                  ?.name,
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
      {showModal ? (
        <div>
          <input
            value={editValue!}
            onChange={(e) => {
              setEditValue(e.target.value);
            }}
          />
          <br />
          <button onClick={handleCollectionUpdate}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
          <button onClick={handleDeleteCollection}>Delete Collection</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
