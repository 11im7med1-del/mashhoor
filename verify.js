const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📊 Response Status:', res.statusCode);
    console.log('📏 Content length:', data.length);
    
    // Check for critical elements
    const checks = {
      'DOCTYPE': data.includes('<!doctype html>'),
      'Root element': data.includes('id="root"'),
      'Style tags': data.includes('<style>') && data.includes('</style>'),
      'Script tag': data.includes('<script>') && data.includes('</script>'),
      'React CDN or embedded': data.includes('React') || data.includes('react'),
      'Arabic content': data.includes('مشهور') || data.includes('ألعاب'),
      'Site shell class': data.includes('class="site-shell"') || data.includes('country-setup')
    };
    
    console.log('\n✅ Checks:');
    Object.entries(checks).forEach(([name, passed]) => {
      console.log(`   ${passed ? '✓' : '✗'} ${name}`);
    });
    
    const allPassed = Object.values(checks).every(v => v);
    console.log('\n' + (allPassed ? '✓ SITE LOADS SUCCESSFULLY' : '✗ Some checks failed'));
    
    process.exit(allPassed ? 0 : 1);
  });
});

req.on('error', (e) => {
  console.error('❌ Connection error:', e.message);
  process.exit(1);
});

req.end();
