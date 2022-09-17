import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "react-query";
import { ArrowBigUpLine } from "tabler-icons-react";
import { updateVideo, uploadVideo } from "../api";
import { useVideos } from "../context/videos";
import { Video } from "../types";

function EditVideoForm({
  videoId,
  setOpen,
}: {
  videoId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = useVideos();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  const mutation = useMutation<
    AxiosResponse<Video>,
    AxiosError,
    Parameters<typeof updateVideo>[0]
  >(updateVideo, {
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutation.mutate({ videoId, ...values });
      })}
    >
      <Stack>
        <TextInput
          label="Title"
          placeholder="My Awesome Video"
          required
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          placeholder="Your video description goes here..."
          required
          {...form.getInputProps("description")}
        />
        <Switch label="Published" {...form.getInputProps("published")} />

        <Button type="submit">Save changes</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const mutation = useMutation(uploadVideo);
  const config = {
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };
  function upload(files: File[]) {
    const formData = new FormData();
    formData.append("video", files[0]);
    mutation.mutate({ formData, config });
  }
  return (
    <>
      <Modal
        opened={open}
        closeOnClickOutside={false}
        onClose={() => setOpen(false)}
        title="Upload Video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone onDrop={upload} accept={[MIME_TYPES.mp4]} multiple={false}>
            {(status) => (
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: "50vh", justifyContent: "center" }}
                direction="column"
              >
                <ArrowBigUpLine />
                <Text>Drag video here or click to upload</Text>
              </Group>
            )}
          </Dropzone>
        )}
        {progress > 0 && (
          <Progress
            size="xl"
            label={`${progress}% uploaded`}
            value={progress}
            mb="xl"
          />
        )}

        {mutation.data && (
          <EditVideoForm videoId={mutation.data.videoId} setOpen={setOpen} />
        )}
      </Modal>

      <Button onClick={() => setOpen(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
