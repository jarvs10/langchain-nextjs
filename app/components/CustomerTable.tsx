"use client";

import { customers } from "@/data/info";

export default function CustomerTable() {
  const customerList = Object.entries(customers).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="w-full h-full overflow-hidden flex flex-col p-6 bg-white dark:bg-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Customers
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your 20 latest customer records
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Total: 20 records
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Country</th>
              <th className="px-6 py-4 font-semibold">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {customerList.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400">
                  #{customer.id}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {customer.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {customer.phone}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {customer.country}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  {customer.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
