package cl.skualo.portal.pwa;

import com.getcapacitor.BridgeActivity;
import com.epicshaggy.biometric.NativeBiometric;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
     @Override
    public void onCreate(Bundle savedInstanceState) {
    registerPlugin(savedInstanceState);
    super.onCreate(savedInstanceState);
  }
}
