'use client'
import UserSettingsPage from "@/components/auth/UserSettings";
import KamakoBoard from "@/components/shapes/KamakoBoard";

function Page() {
	return (
		<div className="fixed inset-1">
      <UserSettingsPage/>
			<KamakoBoard />
		</div>
	)
}

export default Page;
