"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  MapPin,
  Plus,
  Trash2,
  Check,
  X,
} from "lucide-react";

export default function AccountDetailsPage() {
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Ayesha",
    lastName: "Tuba",
    email: "ayesha@example.com",
    phone: "+91 98765 43210",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Ayesha Tuba",
      phone: "+91 98765 43210",
      address: "123 Fashion Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    type: "Home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handlePersonalChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const address = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0,
    };

    setAddresses((previous) => [...previous, address]);

    setNewAddress({
      type: "Home",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

    setShowAddressForm(false);
  };

  const deleteAddress = (id) => {
    setAddresses((previous) =>
      previous.filter((address) => address.id !== id)
    );
  };

  const makeDefault = (id) => {
    setAddresses((previous) =>
      previous.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <main className="min-h-screen bg-(--background)">
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-12 sm:px-10 lg:px-6 lg:pb-28">
        {/* Back */}
        <Link
          href="/account/dashboard"
          className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition-colors hover:text-black"
        >
          <ArrowLeft size={15} strokeWidth={1.6} />
          My Account
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-(--muted)">
            Account Settings
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Personal Information
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-(--muted)">
            Manage your personal details and saved delivery addresses.
          </p>
        </div>

        {/* =====================================================
            PERSONAL INFORMATION
        ===================================================== */}
        <section className="border-t border-(--border)">
          <div className="flex items-center justify-between border-b border-(--border) py-5">
            <div>
              <h2 className="text-lg font-medium">
                Personal Information
              </h2>

              <p className="mt-1 text-xs text-(--muted)">
                Your basic account details
              </p>
            </div>

            {!editingPersonal && (
              <button
                type="button"
                onClick={() => setEditingPersonal(true)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-60"
              >
                <Edit3 size={14} strokeWidth={1.6} />
                Edit
              </button>
            )}
          </div>

          <div className="grid gap-x-10 gap-y-7 border-b border-(--border) py-8 sm:grid-cols-2">
            {/* First name */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-(--muted)">
                First Name
              </label>

              {editingPersonal ? (
                <input
                  type="text"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalChange}
                  className="w-full border-b border-black/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-black"
                />
              ) : (
                <p className="text-sm">
                  {personalInfo.firstName}
                </p>
              )}
            </div>

            {/* Last name */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-(--muted)">
                Last Name
              </label>

              {editingPersonal ? (
                <input
                  type="text"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalChange}
                  className="w-full border-b border-black/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-black"
                />
              ) : (
                <p className="text-sm">
                  {personalInfo.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-(--muted)">
                Email Address
              </label>

              {editingPersonal ? (
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  className="w-full border-b border-black/20 bg-transparent py-2 text-sm outline-none transition-colors focus:border-black"
                />
              ) : (
                <p className="text-sm">
                  {personalInfo.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.13em] text-(--muted)">
                Phone Number
              </label>

              <p className="text-sm text-(--muted)">
                {personalInfo.phone}
              </p>
            </div>
          </div>

          {/* Save / Cancel */}
          {editingPersonal && (
            <div className="flex justify-end gap-3 border-b border-(--border) py-5">
              <button
                type="button"
                onClick={() => setEditingPersonal(false)}
                className="flex items-center gap-2 border border-black/15 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition hover:bg-neutral-50"
              >
                <X size={14} />
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setEditingPersonal(false)}
                className="flex items-center gap-2 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-85"
              >
                <Check size={14} />
                Save Changes
              </button>
            </div>
          )}
        </section>

        {/* =====================================================
            ADDRESSES
        ===================================================== */}
        <section className="mt-16">
          <div className="flex flex-col gap-4 border-b border-(--border) pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-medium">
                Saved Addresses
              </h2>

              <p className="mt-1 text-xs text-(--muted)">
                Manage your delivery addresses
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddressForm((value) => !value)}
              className="flex w-fit items-center gap-2 border border-black/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition hover:bg-black hover:text-white"
            >
              <Plus size={15} strokeWidth={1.7} />
              Add Address
            </button>
          </div>

          {/* =====================================================
              ADD ADDRESS FORM
          ===================================================== */}
          {showAddressForm && (
            <form
              onSubmit={handleAddAddress}
              className="border-b border-(--border) bg-neutral-50 px-5 py-7 sm:px-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Add New Address
                </h3>

                <button
                  type="button"
                  onClick={() => setShowAddressForm(false)}
                  aria-label="Close"
                >
                  <X
                    size={18}
                    strokeWidth={1.6}
                    className="text-(--muted)"
                  />
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  name="name"
                  value={newAddress.name}
                  onChange={handleAddressChange}
                  placeholder="Full name"
                  className="border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  required
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleAddressChange}
                  placeholder="Phone number"
                  className="border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  required
                  name="address"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                  placeholder="Address"
                  className="sm:col-span-2 border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  required
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  required
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  required
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleAddressChange}
                  placeholder="Pincode"
                  className="border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition hover:opacity-85"
                >
                  Save Address
                </button>
              </div>
            </form>
          )}

          {/* =====================================================
              ADDRESS LIST
          ===================================================== */}
          <div className="divide-y divide-(--border)">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="py-7"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border)">
                      <MapPin
                        size={17}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-sm font-semibold">
                          {address.type}
                        </h3>

                        {address.isDefault && (
                          <span className="bg-black px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-white">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm font-medium">
                        {address.name}
                      </p>

                      <p className="mt-1 max-w-lg text-sm leading-6 text-(--muted)">
                        {address.address}, {address.city},{" "}
                        {address.state} — {address.pincode}
                      </p>

                      <p className="mt-1 text-xs text-(--muted)">
                        {address.phone}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-5">
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() =>
                              makeDefault(address.id)
                            }
                            className="text-xs font-semibold uppercase tracking-[0.08em] underline underline-offset-4"
                          >
                            Make Default
                          </button>
                        )}

                        <button
                          type="button"
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-(--muted) transition hover:text-black"
                        >
                          <Edit3 size={13} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteAddress(address.id)
                          }
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-(--muted) transition hover:text-red-700"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <MapPin
                  size={25}
                  strokeWidth={1.4}
                  className="mx-auto text-(--muted)"
                />

                <h3 className="mt-4 text-sm font-medium">
                  No saved addresses
                </h3>

                <p className="mt-1 text-xs text-(--muted)">
                  Add an address for faster checkout.
                </p>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}