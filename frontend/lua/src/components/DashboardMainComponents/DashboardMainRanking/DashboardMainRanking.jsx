import * as React from "react";
import {
  useSensors,
  useSensor,
  KeyboardSensor,
  PointerSensor,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";

const initialSongs = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "Pop",
    cover: null,
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    genre: "Dance",
    cover: null,
  },
  {
    id: "3",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    genre: "Pop",
    cover: null,
  },
];

// Sortierbare Items erstellen:
const SortableItems = ({ song, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: song.id });

  const style = {
    transform: transform ? `translateY(${transform.y}px)` : "none",
    transition: "transform 0.2s ease-in-out",
    border: "1px solid #eee",
    borderRadius: "4px",
    marginBottom: "0.75rem",
    padding: "0.75rem",
    backgroundColor: song.isNew ? "#b8b8b8" : "white",
  };

  return (
    <Group ref={setNodeRef} style={style} {...attributes}>
      <ActionIcon {...listeners}>
        <IconGripVertical size="1rem" />
      </ActionIcon>
      <Skeleton height={50} width={50} radius="sm" />
      <Box style={{ flex: 1 }}>
        <Text fw={500}>{song.title}</Text>
        <Text size="sm" c="dimmed">
          {song.artist}
        </Text>
        <Badge variant="light" mt={4}>
          {song.genre}
        </Badge>
      </Box>
      {!song.isNew && <Text>{index + 1}</Text>}
    </Group>
  );
};

export default function DashboardMainRanking() {
  const [songs, setSongs] = React.useState(initialSongs);
  const [newSong, setNewSong] = React.useState(null);

  // Sensoren für die Steuerung:
  const sensors = useSensors(
    useSensor(PointerSensor), // Maus und Touch
    useSensor(KeyboardSensor, {
      // Tastertur
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Steuerung zum fallenlassen des Songs
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Wenn neuer Song einsortiert wird:
    if (active.id === newSong?.id && over) {
      const allItems = newSong ? [newSong, ...songs] : songs;
      const overIndex = allItems.findIndex((song) => song.id === over.id);
      insertNewSong(overIndex);
      return;
    }

    // Normales verschieben
    if (active.id !== over?.id) {
      // Position ändert sich
      setSongs((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex); // Verschiebe den Song
      });
    }
  };

  // Neune Song generieren:
  const addNewSong = () => {
    // Platzhalter-Song:
    const mockNewSong = {
      id: Date.now().toString(), // Eindeutige ID
      title: `New Song ${Math.floor(Math.random() * 100)}`,
      artist: `Artist ${Math.floor(Math.random() * 10)}`,
      genre: ["Pop", "Rock", "Hip-Hop", "Electronic"][
        Math.floor(Math.random() * 4)
      ],
      cover: null,
      isNew: true,
    };
    setNewSong(mockNewSong); // Platzhalter-Song in die Liste eintragen
  };

  // Neuen Song einfügen und Letztplatzierten bei mehr als 10 entfernen:
  const insertNewSong = (index) => {
    if (!newSong) return;
    const updatedSongs = [...songs];
    // Wenn der neue Song an die letzte Position gezogen wird
    if (index >= updatedSongs.length) {
      updatedSongs.push({ ...newSong, isNew: false });
    } else {
      updatedSongs.splice(index, 0, { ...newSong, isNew: false });
    }
    if (updatedSongs.length > 10) {
      updatedSongs.pop();
    }
    setSongs(updatedSongs);
    setNewSong(null); // Neuen Song zurcksetzten
  };

  const allSongs = newSong ? [newSong, ...songs] : songs;

  return (
    <Box miw={300} mah={600} style={{ overflowY: "auto" }}>
      <Title order={4}>My top 10</Title>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={newSong ? [newSong, ...songs] : songs}
          strategy={verticalListSortingStrategy}
        >
          {newSong && (
            <SortableItems key={newSong.id} song={newSong} index={0} />
          )}
          {newSong && (
            <Divider
              my="sm"
              label="Drag the song down to rank it"
              labelPosition="center"
            />
          )}
          {songs.map((song, index) => (
            <SortableItems key={song.id} song={song} index={index} />
          ))}
        </SortableContext>
      </DndContext>
      <Button onClick={addNewSong} mt={1}>
        Add new song
      </Button>
    </Box>
  );
}
