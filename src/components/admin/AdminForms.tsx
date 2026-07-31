import { useState } from "react";
import { uploadImage } from "@/lib/api";
import type { BlogPost, Listing } from "@/lib/content";

const inputClass =
  "w-full border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-brass";
const labelClass = "label-mono text-muted-foreground";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ImageUploader({
  onUploaded,
  multiple,
}: {
  onUploaded: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        disabled={busy}
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length === 0) return;
          setBusy(true);
          setError(null);
          try {
            const urls = await Promise.all(files.map(uploadImage));
            onUploaded(urls);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
        className="label-mono w-full border border-dashed border-border px-3 py-3 text-muted-foreground"
      />
      {busy && <p className="label-mono mt-2 text-brass">Uploading…</p>}
      {error && <p className="label-mono mt-2 text-destructive">{error}</p>}
    </div>
  );
}

export function BlogForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  saving,
}: {
  value: Partial<BlogPost>;
  onChange: (v: Partial<BlogPost>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const set = (patch: Partial<BlogPost>) => onChange({ ...value, ...patch });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5 border border-border bg-background p-6"
    >
      <p className="label-mono text-brass">{value.id ? "Edit entry" : "New entry"}</p>
      <Field label="Title">
        <input
          required
          className={inputClass}
          value={value.title ?? ""}
          onChange={(e) => set({ title: e.target.value })}
        />
      </Field>
      <Field label="Slug">
        <input
          required
          className={inputClass}
          value={value.slug ?? ""}
          onChange={(e) => set({ slug: e.target.value })}
        />
      </Field>
      <Field label="Excerpt">
        <textarea
          rows={2}
          className={inputClass}
          value={value.excerpt ?? ""}
          onChange={(e) => set({ excerpt: e.target.value })}
        />
      </Field>
      <Field label="Content (HTML)">
        <textarea
          rows={10}
          className={inputClass}
          value={value.content ?? ""}
          onChange={(e) => set({ content: e.target.value })}
        />
      </Field>
      <Field label="Cover image">
        <ImageUploader onUploaded={(urls) => set({ coverImage: urls[0] ?? "" })} />
      </Field>
      {value.coverImage && (
        <img src={value.coverImage} alt="" className="h-32 w-full object-cover" />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Status">
          <select
            className={inputClass}
            value={value.status ?? "draft"}
            onChange={(e) => set({ status: e.target.value as "draft" | "published" })}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </Field>
        <Field label="Published at">
          <input
            type="date"
            className={inputClass}
            value={value.publishedAt?.slice(0, 10) ?? ""}
            onChange={(e) => set({ publishedAt: e.target.value })}
          />
        </Field>
      </div>
      <FormActions saving={saving} onCancel={onCancel} />
    </form>
  );
}

export function ListingForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  saving,
}: {
  value: Partial<Listing>;
  onChange: (v: Partial<Listing>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const set = (patch: Partial<Listing>) => onChange({ ...value, ...patch });
  const images = value.images ?? [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5 border border-border bg-background p-6"
    >
      <p className="label-mono text-brass">{value.id ? "Edit listing" : "New listing"}</p>
      <Field label="Title">
        <input
          required
          className={inputClass}
          value={value.title ?? ""}
          onChange={(e) => set({ title: e.target.value })}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price">
          <input
            className={inputClass}
            value={value.price ?? ""}
            onChange={(e) => set({ price: e.target.value })}
          />
        </Field>
        <Field label="Location">
          <input
            className={inputClass}
            value={value.location ?? ""}
            onChange={(e) => set({ location: e.target.value })}
          />
        </Field>
        <Field label="Type">
          <select
            className={inputClass}
            value={value.type ?? "Villa"}
            onChange={(e) => set({ type: e.target.value })}
          >
            {["Villa", "Penthouse", "Hotel", "Development Plot", "Apartment"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status">
          <select
            className={inputClass}
            value={value.status ?? "available"}
            onChange={(e) => set({ status: e.target.value as NonNullable<Listing["status"]> })}
          >
            {["draft", "available", "reserved", "sold"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Bedrooms">
          <input
            type="number"
            className={inputClass}
            value={value.bedrooms ?? ""}
            onChange={(e) => set({ bedrooms: Number(e.target.value) })}
          />
        </Field>
        <Field label="Bathrooms">
          <input
            type="number"
            className={inputClass}
            value={value.bathrooms ?? ""}
            onChange={(e) => set({ bathrooms: Number(e.target.value) })}
          />
        </Field>
        <Field label="Built area">
          <input
            className={inputClass}
            value={value.area ?? ""}
            onChange={(e) => set({ area: e.target.value })}
          />
        </Field>
        <Field label="Reference">
          <input
            className={inputClass}
            value={value.reference ?? ""}
            onChange={(e) => set({ reference: e.target.value })}
          />
        </Field>
        <Field label="External link (tour / portal)">
          <input
            type="url"
            placeholder="https://"
            className={inputClass}
            value={value.link ?? ""}
            onChange={(e) => set({ link: e.target.value })}
          />
        </Field>
        <Field label="Brochure / dossier link">
          <input
            type="url"
            placeholder="https://"
            className={inputClass}
            value={value.brochureUrl ?? ""}
            onChange={(e) => set({ brochureUrl: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          rows={8}
          className={inputClass}
          value={value.description ?? ""}
          onChange={(e) => set({ description: e.target.value })}
        />
      </Field>
      <Field label="Images">
        <ImageUploader multiple onUploaded={(urls) => set({ images: [...images, ...urls] })} />
      </Field>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => set({ images: images.filter((_, idx) => idx !== i) })}
              className="relative h-20 w-28 border border-border"
              title="Remove image"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <span className="label-mono absolute inset-x-0 bottom-0 bg-primary/80 text-primary-foreground">
                remove
              </span>
            </button>
          ))}
        </div>
      )}
      <FormActions saving={saving} onCancel={onCancel} />
    </form>
  );
}

function FormActions({ saving, onCancel }: { saving: boolean; onCancel: () => void }) {
  return (
    <div className="flex gap-3 border-t border-border pt-5">
      <button
        type="submit"
        disabled={saving}
        className="label-mono bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-petrol-light disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="label-mono border border-border px-6 py-3 text-primary transition-colors hover:bg-secondary"
      >
        Cancel
      </button>
    </div>
  );
}