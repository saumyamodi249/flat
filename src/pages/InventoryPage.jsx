import BottomNav from '../components/BottomNav'

function InventoryPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--theme-route-title)] pb-16">
      <h1 className="text-2xl font-semibold text-[var(--theme-bottom)] text-center pt-6">Inventory</h1>
      <BottomNav />
    </div>
  )
}

export default InventoryPage
