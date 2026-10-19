import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type NoteStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function Guestbook() {
  const [message, setMessage] = useState('');
  const [noteStatus, setNoteStatus] = useState<NoteStatus>('idle');

  const handleSendNote = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || noteStatus === 'sending') return;

    if (!supabase) {
      setNoteStatus('error');
      return;
    }

    setNoteStatus('sending');
    const { error } = await supabase.from('guestbook_notes').insert({ message: trimmed });

    if (error) {
      setNoteStatus('error');
      return;
    }

    setMessage('');
    setNoteStatus('sent');
  };

  return (
    <section className="guestbook shell">
      <div>
        <p className="eyebrow">04 / leave a little love</p>
        <h2>What would you<br /><em>tell Zoppy?</em></h2>
      </div>
      <form className="guestbook-form" onSubmit={handleSendNote}>
        <p>Send a tiny note to the dream archive.</p>
        <div className="input-row">
          <input
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (noteStatus !== 'sending') setNoteStatus('idle');
            }}
            placeholder="Write a kind thought..."
            aria-label="Your message"
            maxLength={280}
          />
          <button type="submit" disabled={!message.trim() || noteStatus === 'sending'} aria-label="Send message">
            <ArrowUpRight size={19} />
          </button>
        </div>
        {noteStatus === 'sending' && <span className="sent" role="status">Sending your note…</span>}
        {noteStatus === 'sent' && <span className="sent" role="status"><Check size={15} /> Your note is tucked safely away.</span>}
        {noteStatus === 'error' && <span className="sent sent-error" role="status">Oops, Zoppy couldn’t receive that. Please try again.</span>}
      </form>
    </section>
  );
}