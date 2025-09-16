import { VerificationForm } from "@/components/TwoFa/VerificationForm";
import type { reset2FAResponseType, verify2FAResponseType } from "@/types";
import { useNavigate } from "react-router-dom";


const Verify2FA: React.FC = () => {
	const navigate = useNavigate();

    const hanldeVerificationSuccess = async (data: verify2FAResponseType) => {
		if(data) {
			navigate("/");
		}
	}

	const handle2FAReset = async (data: reset2FAResponseType) => {
		if(data) {
			navigate("/setup-2fa")
		}
	}

    return (
      <div className="h-screen w-full flex items-center justify-center">
          <VerificationForm onVerifySuccess={hanldeVerificationSuccess} onResetSuccess={handle2FAReset} />
      </div>
    )
}

export default Verify2FA;