package cl.skualo.portal.pwa;
import android.os.Bundle;
import com.epicshaggy.biometric.NativeBiometric;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
public class MainActivity extends BridgeActivity {
    @Override
     public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NativeBiometric.class);
        registerPlugin(GoogleAuth.class);
        super.onCreate(savedInstanceState);
     }
}
