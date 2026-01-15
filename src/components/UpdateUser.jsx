import { useGetUserQuery, useUpdateUserMutation } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const { data: user, isLoading } = useGetUserQuery();
  const [updateUser, { isLoading: saving }] = useUpdateUserMutation();
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    if (user) setForm({ username: user.username || "", email: user.email || "" });
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(form).unwrap();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Username</Label>
        <Input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}