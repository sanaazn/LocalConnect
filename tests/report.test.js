// Exemple de test simple sans fichier externe

// Fonction à tester
function add(a, b) {
    return a + b;
  }
  
  // Test unitaire
  test('ajoute 1 + 2 pour égaler 3', () => {
    expect(add(1, 2)).toBe(3);  // On teste que 1 + 2 == 3
  });
  
  test('ajoute 3 + 7 pour égaler 10', () => {
    expect(add(3, 7)).toBe(10);  // On teste que 3 + 7 == 10
  });
  