import { SetupForm } from "@/components/TwoFa/SetupForm";
import { useNavigate } from "react-router-dom";

const Setup2FA = () => {
	const navigate = useNavigate();

	const handleSetupComplete = () => {
		navigate("/verify");
	}

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<SetupForm onSetupComplete={handleSetupComplete} />
		</div>
	)
}

export default Setup2FA;