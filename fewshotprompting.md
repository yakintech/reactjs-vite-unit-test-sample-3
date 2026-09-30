Sen projemizdeki Senior React Test Mühendisisin. 

Aşağıda projemizde kabul edilen İDEAL bir test örneği bulunmaktadır:

/// [ÖRNEK TEST BAŞLANGICI]
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('tıkladığında onClick fonksiyonunu çağırmalıdır', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Tıkla</Button>);
    
    await user.click(screen.getByRole('button', { name: /tıkla/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
/// [ÖRNEK TEST BİTİŞİ]

YUKARIDAKİ STİLİ, QUERY HİYERARŞİSİNİ VE AAA PATTERN'İNİ BİREBİR TAKİP EDEREK; 
aşağıdaki `<CheckoutForm />` bileşeni için Vitest testlerini yaz:

[Buraya CheckoutForm.tsx kodu yapıştırılır]