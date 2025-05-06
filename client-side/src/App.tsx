import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const API_URL = "XXXXXXXXXXXXXXXXXXXXXXXXXXX"; // CHANGE THISSS

export default function App() {
  const [data, setData] = useState<{ name: string; url: string }[]>([]);

  function fetchData() {
    fetch(`${API_URL}/items`).then((res) =>
      res.json().then((i) => setData(i.data))
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function submit(e: FormData) {
    const toastId = toast.loading("menambahkan....");
    const nama = e.get("name") as string;
    const pic = e.get("file") as File;
    const data = new FormData();
    data.append("name", nama);
    data.append("file", pic);

    const res = await (
      await fetch(`${API_URL}/form`, {
        method: "POST",
        body: data,
      })
    ).json();
    if (!res.success) {
      toast.error("Gagal!", { id: toastId });
      return;
    }
    toast.success("Berhasil!", { id: toastId });
    window.location.reload();
  }

  function Form() {
    const { pending } = useFormStatus();
    return (
      <form
        action={submit}
        method="POST"
        encType="multipart/form-data"
        className="rounded-xl w-fit border border-neutral-400 px-4 py-3 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              disabled={pending}
              name="name"
              className="rounded-md border border-black px-3 py-2"
              placeholder="input nama"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="pic">Gambar</label>
            <input
              type="file"
              id="pic"
              name="file"
              disabled={pending}
              accept="image/*"
              className="rounded-md border border-black px-3 py-2"
              placeholder="input nama"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="px-2 py-3 text-white bg-sky-400 hover:bg-sky-300 disabled:bg-neutral-500 transition-all duration-300 rounded-lg font-bold"
        >
          Submit!
        </button>
      </form>
    );
  }

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="min-h-[60vh] h-full flex items-center justify-center">
        <Form />
      </div>
      {data.length > 0 && (
        <div className="w-full mt-20">
          <h2 className="text-2xl font-bold mb-2">Gambars</h2>
          <div className="w-full grid grid-cols-3 gap-4 justify-center">
            {data.map((i) => (
              <figure
                className="rounded-lg border border-neutral-300 px-5 py-4 aspect-[3/2] w-full flex items-center justify-center flex-col"
                key={i.name}
              >
                <img
                  src={i.url}
                  alt={`${i.name} image`}
                  className="object-cover overflow-hidden aspect-square rounded-lg h-full"
                />
                <h3 className="mt-2 font-medium">{i.name}</h3>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
